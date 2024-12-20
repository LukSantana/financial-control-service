export class ControllerFactory {
  static getOperationMyMethod(method: string) {
    switch (method) {
      case 'fetchMany':
        return 'findMany';
      case 'fetchOne':
        return 'findUnique'
      case 'create':
        return 'create';
      case 'update':
        return 'update';
      case 'delete':
        return 'delete';
      default:
        throw new Error('Operation not found');
    }
  }
}