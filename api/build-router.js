const unionWith = require('lodash.unionwith');
const { Router } = require('express');

/**
 *
 * @param {Object} routes {0: [{},{}], 1: [{},{}]}
 * @return {Array} return an Array with all available routes
 * [[{path, route},[path, route}],[{path, route},{path, route}],[{path, route},[path, route}]]
 */
function buildApiVersionRouters(routes) {
  return Object.keys(routes)
    .reduce((acc, version) => {
      acc.push(routes[version].reduce((versionRoutes, route) => {
        const {
          domain,
          path,
          method,
        } = route;

        /* istanbul ignore next */
        const finalDomain = (domain) ? `/${domain}` : '';

        versionRoutes.push({
          path: `${method}_${finalDomain}/${path}`,
          route,
        });

        return versionRoutes;
      }, []));

      return acc;
    }, []);
}

/**
 *
 * @param {Array} defaultMiddlewares default middlewares to be applied for all routes
 * @param {Number} version api version number
 */
function createBuildRoute(defaultMiddlewares, version) {
  /**
   * @param {Object} appRouter express app Router
   * @param {Object} controller element with all data to build the route
   */
  return (appRouter, controller) => {
    const {
      method,
      domain,
      path,
      handler,
      bindTo,
      middlewares = [],
      skipDefaultMiddlewares = false,
      postMiddlewares = [],
      skipVersion,
    } = controller.route;

    const finalMiddlewares = [
      ...(
        skipDefaultMiddlewares
          /* istanbul ignore next */
          ? []
          : defaultMiddlewares
      ),
      ...middlewares,
    ];

    /* istanbul ignore next */
    const versionPart = !skipVersion ? `/v${version}` : '';
    /* istanbul ignore next */
    const finalDomain = (domain) ? `/${domain}` : '';
    const finalPath = `${finalDomain}${versionPart}${path}`;

    console.log(`[server] Route ${method.toUpperCase()} ${finalPath}`);

    return appRouter[method](finalPath, [...finalMiddlewares, handler.bind(bindTo),
      ...postMiddlewares]);
  };
}

/**
 * Merge the actual api paths with paths in the previous versions.
 * Remove the path excluded for this api version
 *
 * @param {Array} apiVersion [{path, route}, {path, route}]
 * @param {Array} previousApiVersion [{path, route}, {path, route}]
 *
 * @return {Array} [{path, route}, {path, route}, {path, route}]
 */
function buildActualRoutesObject(apiVersion, previousApiVersion) {
  return unionWith(apiVersion, previousApiVersion,
    (one, two) => (one.path === two.path))
    // controllers (routes) without "handler" are handled as removed controllers in this version
    .filter(controller => !!controller.route.handler);
}

/**
 * Build express routes
 * @function
 * @param {array} routes
 * @param {array} [defaultMiddlewares=[]]
 * @returns {Router} express app router with actual api versioned routes
 */
function buildRouter(
  routes,
  /* istanbul ignore next */
  defaultMiddlewares = [],
) {
  /* build Array structure like:
   [
    [{path, route},[path, route}],
    [{path, route},{path, route}],
    [{path, route},[path, route}]
    ]
  */
  const builtVersion = buildApiVersionRouters(routes);

  // builtVersion = [[{},{}], [{},{},{}], [{}]]
  return builtVersion.reduce((appRouter, apiVersion, index) => {
    // apiVersion = [{},{}]
    const previousApiVersion = builtVersion[index - 1] || [];

    // merge controllers in this version with those in previous version(only one for "path")
    const finalControllers = buildActualRoutesObject(apiVersion, previousApiVersion);

    // save the actual api version routes to be used with the next api version routes
    builtVersion[index] = finalControllers;

    // get the function to be used for adding path routes to app router
    const buildRouteFunction = createBuildRoute(defaultMiddlewares, index);

    // add all api versio paths to app router
    return finalControllers.reduce(buildRouteFunction, appRouter);
  }, new Router());
}

module.exports = buildRouter;
