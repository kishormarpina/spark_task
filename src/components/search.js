import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import {useState, useEffect} from 'react';

function Search({post, name, handleBack}) {
    console.log("in search.js",name,post)
    let [page, setPage] = useState(1)
    const itemsPerPage = 10
    let relatedkeys={}
    let leftButton = '';
    let rightButton = '';
    let curPage = ''
    if(!post.length){
        return(<div>No Results Found</div>)
    }
    if(post.length && page!=1){
        leftButton= (<button onClick={()=>{
        setPage(page-1)
        }}>Prev</button>)
    }
    if(post.length && page!=parseInt(post.length/itemsPerPage)){
        rightButton= (<button onClick={()=>{
        setPage(page+1)
        }}>Next</button>)
    }
    if(post.length>0){
        curPage = page
    }
    let bodyHtml = ''
    console.log("search bodyhtml ",post)
    post.forEach(el =>{
    let keys = el.data&& el.data[0]&& el.data[0].keywords?el.data[0].keywords:[]
    console.log("search keywords ",keys)
    keys.forEach(key =>{
        if(key!=name && relatedkeys[key]){
            relatedkeys[key]++
        }else{
        relatedkeys[key] = 1
        }
    })
    })
    let sortedkeys = [];
    for (let rkey in relatedkeys) {
    sortedkeys.push([rkey, relatedkeys[rkey]]);
    }
    sortedkeys.sort(function(a, b) {
        return b[1]-a[1];
    });
    bodyHtml = post.slice((page-1)*itemsPerPage,(page-1)*itemsPerPage+itemsPerPage).map((elem,ind) =>{
    console.log("elem is",elem.links,ind)
    return <ListGroup>
        <ListGroup.Item>
        <Row>
        <Col sm={2}><img  width="105" height="60"  src={elem.links?elem.links[0].href:''}></img></Col>
        <Col><Row>{elem.data[0].title}</Row> <Row>{elem.data[0].date_created.slice(0,10)}</Row> </Col>
        </Row>
        </ListGroup.Item>
    </ListGroup>
    })
    bodyHtml.push(<div align ='center'>{leftButton}<label>{curPage}</label>{rightButton}&emsp;&emsp;&emsp;&emsp;
    <button  onClick={handleBack}>Back</button></div>)
    console.log(sortedkeys)
    let relatedSearchs =[]
    for(let i=0;i<8;i=i+2){
        relatedSearchs.push(<Row><Col sm={4}>{sortedkeys[i][0]}</Col><Col>{sortedkeys[i+1][0]}</Col></Row>)
    }
    bodyHtml.push(<div style={{ padding: "2rem", }}>
    <h4>Related Searches</h4>
        {relatedSearchs}
    </div>)
    return (
        <div>
        {bodyHtml}
        </div>
    );
}

export default Search;
