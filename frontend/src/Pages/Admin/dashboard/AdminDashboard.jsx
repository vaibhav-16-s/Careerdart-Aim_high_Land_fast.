import React from 'react'
import AdminNavbar from '../../../components/navbar/AdminNavbar'
import Card from 'react-bootstrap/Card';

function AdminDashboard() {
  return (
    <>
      <div className='header'><AdminNavbar /></div>

      <div className='body'><h3>Admin Dashboard</h3>
        <div className='bodyLine'><h5>Welcome Admin!{/*to changed with admin name through tokens*/}</h5></div>
        <div>

          <Card style={{ width: '80rem' }}>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                All the users including employers and job seekers.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>

            </Card.Body>
          </Card>


          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Employers</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                All employers associated and providing job opportunities.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>

            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title> Total Job Seekrs</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                The number of the Job Seekers pacing through the ir careers using Careerdart.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>

            </Card.Body>
          </Card>



          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Total Jobs</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Total number of Jobs available on careerdart.
                (only active)
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>

            </Card.Body>
          </Card>
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

export default AdminDashboard