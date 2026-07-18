import React from 'react'
import EmployerNavbar from '../../components/navbar/EmployerNavbar'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


function EmployerDashboard() {
    return (
        <>
            <div className='header'><EmployerNavbar /></div>
            <div className='body'><h4>Employer dashboard</h4>
                <p>Heyo! Employer!!{/*To be changed with emplyer name via token*/}</p>

                <div>

                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Jobs Released</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                                Total number of Jobs released by logged in Employer.
                            </Card.Text>
                            <Card.Link href="#">view all jobs</Card.Link>

                        </Card.Body>
                    </Card>


                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total Applications</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text> Recieved : </Card.Text>
                            <Card.Text> Accepted : </Card.Text>
                            <Card.Text> Pending : </Card.Text>
                            <Card.Text> cancelled : </Card.Text>

                            <Card.Link href="#">view all aplications</Card.Link>

                        </Card.Body>
                    </Card>
                </div>

                <div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td >Larry the Bird</td>
                                <td>Otto</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>

            </div>

            <div>
                <h2>Contact Us</h2>
                <p>
                    Email: support@careerdart.com
                </p>

                <p>
                    Phone: +1(212)555-0174
                </p>

                <p>
                    Address: CareerDart Headquarters, NewYork
                </p>

            </div>


            <div className="footer">

                <div>© Careerdart</div>
            </div>

        </>
    )
}

export default EmployerDashboard