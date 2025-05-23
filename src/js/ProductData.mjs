function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data)
      .catch(err => {
        console.error(`Error fetching data from ${this.path}:`, err);
        throw err;
      });
  }
  async findProductById(id) {
    try {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    } catch (err) {
      console.error(`Error finding product with ID ${id}:`, err);
      throw err;
    }
  }
}
