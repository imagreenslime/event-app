import React, {useEffect, useState} from 'react'
import { Button, InputGroup, Form, Container, Row, Col, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/typography.scss';
import FederationForm from './components/FederationForm.js';
import Map from './components/Map.js';
import TableList from './components/TableList.js';
import PageSelector from './components/PageSelector.js';
import Navigation from './components/Navigation.js'
import { filterDates, filterNames, filterStates, filterPages, setQueries, filterFederations} from "./filters.js"

// NOTE LEARN HOW TO MONGO UI INDEXING
function App(){
  // useStates and initiatings

  const [meetData, setMeetData] = useState([])
  const [filteredMeetData, setFilteredMeetData] = useState([])
  
  const [search, setSearch] = useState('') 

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const [federationOptions, setFederationOptions] = useState([])
  const [federationFilter, setFederationFilter] = useState([])

  const [stateList, setStateList] = useState([])

  const itemsPerPage = 20

  // part 1: initiates federation options
  useEffect(() => {
    fetch('/meets')
    .then((response) => {
      return response.json()
    })
    .then(data => {
      setFederationOptions(data.fedOptions)
      })
  }, [])


  const filters = {
    federation: federationOptions // OR effect for categories
  };
  const queryParameters = setQueries(filters)

  // part 2: federation filter => federation data
  useEffect(() => {
    fetch(`/meets?${queryParameters.toString()}`)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        setMeetData(data.info)
        }
      )
  }, [federationOptions])

  // regulates pages
  useEffect(() => {
    setPage(1)
    setPageCount(Math.ceil(filteredMeetData.length / itemsPerPage))
  }, [filteredMeetData])

  // query filtering pt 2

  useEffect(() => {
    let t1 = filterNames(meetData, search) // filter names
    let t2 = filterStates(t1, stateList)
    let t3 = filterFederations(t2, federationFilter)
    let t4 = filterDates(t3)
    setFilteredMeetData(t4)

  }, [search, meetData, stateList, federationFilter])

  return (
    <Container>
      <Navigation/>
      <h1 className='text-center mt-4'>Upcoming Lifting Meets</h1>
      <h2 className='text-center'>Select States to Choose</h2>
      {/* state and federation queries */}
      <Row>
        <Col xs={1} md={2}>
          <FederationForm federations={federationOptions} setFederationFilter={setFederationFilter} federationFilter={federationFilter}/>
        </Col>
        <Col xs={1}>
          <Map stateList={stateList} setStateList={setStateList}/>
        </Col>
      </Row>
      
      {/* selected and filter */}
      <Row>
        <Col className="align-self-end" md={8}>
          <h3> Selected States: {stateList.length > 0 ? stateList.map((state) => (state + ", ")) : "ALL"} </h3>
          <h3> Selected Federations: {federationFilter.length > 0 ? federationFilter.map((fed) => (fed + ", ")) : "ALL"} </h3>
        </Col>
        <Col className="align-self-end" md={4}>
          <Form class="mt-auto pb-2">
            <InputGroup>
              <Form.Control className="align-bottom" onChange={(e) => setSearch(e.target.value)} placeholder='filter events'></Form.Control>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      
      {/* table */}
      <TableList meetData={filterPages(filteredMeetData, page, itemsPerPage)} />
      {/* pages */}
      <Row>
        <Col xs={6} md={4}> 
          <h3>Showing {(page - 1) * itemsPerPage + 1} to {page * itemsPerPage} out of {meetData.length} items</h3>
        </Col>
        <Col xs={6} md={{span:4, offset:4}}>
          <PageSelector page={page} setPage={setPage} pageCount={pageCount} />
        </Col>
      </Row>
    </Container>
  )
}

export default App;