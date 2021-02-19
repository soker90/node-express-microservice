class LogService {
  constructor(type) {
    this.type = type;
  }

  logInfo(...message) {
    console.log(`${this.type} - ${message}`);
  }
}

module.exports = LogService;
