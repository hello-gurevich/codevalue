export class ProductModel {

  constructor(
    public id: number,
    public name: string,
    public price: number,
    public createdAt: Date,
    public description: string = ''
  ) {
  }
}
