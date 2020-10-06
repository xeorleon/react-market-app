import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container } from "reactstrap";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };
  resetFunc = () => {
    this.setState({ cart: [] });
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.name });
    this.getProducts(category.id);
  };
  componentDidMount() {
    this.getProducts();
  }

  getProducts = (supplierID) => {
    let url = "http://localhost:3000/products";
    if (supplierID) {
      url += "?id=" + supplierID;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(
      (c) => c.product.productID === product.productID
    );
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    console.log(newCart);
    console.log(this.state.cart);
  };
  render() {
    let productInfo = { title: "Products List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} resetFunc={this.resetFunc} />

          <Row>
            <Col md="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col md="9">
              <ProductList
                addToCart={this.addToCart}
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
