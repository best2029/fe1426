import { useState } from 'react';
import './App.css';
import { FormControl, Form, FormSelect, Container, Row, Col, Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { MdFileDownloadDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const shops = ["Migros", "Teknosa", "BİM"];
const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const Categories = ["Market", "Teknoloji", "Ev"];
const categoriesObj = Categories.map((category, index) => ({
  id: index,
  name: category,
}));

function App() {
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [products, setProducts] = useState([]);

  const addTheShop = () => {
    if (productName.trim() === "") {
      alert("Ürün Adını Boş Bırakmayın!");
      return;
    }
    if (productShop.trim() === "") {
      alert("Market Seçiniz!");
      return;
    }
    if (productCategories.trim() === "") {
      alert("Ürün Kategorisini Seçiniz!");
      return;
    }

    const formattedProductName = productName.toUpperCase();
    const newProduct = {
      id: nanoid(6),
      name: formattedProductName,
      shop: shopsObj.find((shop) => shop.id === parseInt(productShop, 10)).name,
      category: categoriesObj.find((category) => category.id === parseInt(productCategories, 10)).name,
      isBougth: false,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    console.log(...products)
    setProductName("");
    setProductShop("");
    setProductCategories("");
  };

  const handleRemoveItem=(ıd)=>{
    setProducts(products.filter((center)=>center.id!==ıd))
  }
  const handleIsBought = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isBougth: !product.isBougth } : product
      )
    );
  };
  
  

  return (
    <div className='shop_box'>
      <Container>

        <Row>
          <Col sm="12">
            <Form className="d-flex justify-content-center flex-row">
              <FormControl
                value={productName}
                type="text"
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ürün Adı"
              />
              <FormSelect
                value={productShop}
                onChange={(e) => setProductShop(e.target.value)}
              >
                <option value="">All Shop</option>
                {shopsObj.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </FormSelect>
              <FormSelect
                value={productCategories}
                onChange={(e) => setProductCategories(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesObj.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </FormSelect>
              <Button type="button" onClick={addTheShop}>
                Ekle
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        
      

      <Row className="my-5 d-flex justify-content-center">
          <table>
            <thead>
              <tr className="card-title-head">
                <th>Name</th>
                <th>Category</th>
                <th>Shop</th>
                <th>Id</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {products.map((product) => (
                <tr style={{textDecoration:product.isBougth ? "line-through":"none"}}
                  key={product.id}
                  
                >
                  <td className="card-title">
                    <span className="card-span"></span>
                    {product.name}
                  </td>
                  <td className="card-title">
                    <span className="card-span"></span> {product.category}
                  </td>
                  <td className="card-title">
                    <span className="card-span"></span> {product.shop}
                  </td>
                  <td className="card-title">
                    <span className="card-span w-25"></span>
                    {product.id}
                  </td>
                  <td className="card-title">
                    <MdFileDownloadDone
                    onClick={()=>handleIsBought(product.id)}
                      className="icon"
                    />
                  </td>
                  <td className="card-title">
                    <MdDelete
                      className="icon"
                      onClick={() => handleRemoveItem(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
        </Container>
    </div>
  );
}

export default App;
