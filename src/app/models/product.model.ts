export class ProductModel {

  static createFromFlatObject(flatObject: {[key: string]: any}): ProductModel {
    const { id, name, price, createdAt, description } = flatObject;
    return new ProductModel(id, name, price, createdAt, description);
  }

  constructor(
    public id: number,
    public name: string,
    public price: number,
    public createdAt: string,
    public description: string = ''
  ) {
  }
}
