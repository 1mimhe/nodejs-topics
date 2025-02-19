// Dependency injection is a pattern where modules or classes receive dependencies
// from an external source rather than creating them internally.
// It helps with decoupling, testing, and reusability.

class Service {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger;
  }

  async getUser(userId) {
    const user = await this.db.findUserById(userId);
    this.logger.log(`Fetched user ${user.name}`);
    return user;
  }
}

class Database {}
class Logger {}

const db = new Database();
const logger = new Logger();

const service = new Service(db, logger);

service.getUser(1);