import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


function HomePic({picData, name, handleChange, handleSearch}) {
    console.log("image bodyhtml ")
    let bodyHtml=<div className="App">
      <Container>
        <Row><Col sm={8}>
          <div className="image_title" style={{ padding: "2rem" }}>
              <p>{picData.title}</p>
          </div> </Col>
          <Col> <div style={{ padding: "2rem", }}>
              <input value={name} onChange={handleChange}/>
              <button onClick={handleSearch} value="search" type="button">search</button>
          </div></Col>
        </Row> 
      </Container>
      <Container>
        <center><img width="1050" height="600" src={picData.url}></img></center> 
      </Container>
      <Container>
      <center>
        <Row> {picData.explanation}</Row>
        <center>{picData.date}</center>
        <p1> ©images.nasa.gov</p1>
      </center>
      </Container>

  </div>
    return (
        <div>
        {bodyHtml}
        </div>
    );
}

export default HomePic;
