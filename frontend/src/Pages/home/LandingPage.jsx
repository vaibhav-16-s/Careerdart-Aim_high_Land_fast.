import React from 'react'
import HomeNavbar from '../../components/navbar/HomeNavbar';


function LandingPage() {

    return (
        <>

            <div className='header'>
                <HomeNavbar />
            </div>


            {/* Hero Section */}
            <div className='body'>

                <h3>Hey! Welcome Aboard!!</h3>

                <p>
                    Your journey to the perfect career starts here. Explore jobs,
                    connect with employers, and take the next step toward success.
                </p>



                <div className="hero-section">


                    <h1>
                        Find Your Dream Job With CareerDart
                    </h1>


                    <p>
                        Discover thousands of job opportunities, connect with top employers,
                        and build the career you deserve.
                    </p>



                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search jobs, skills, or companies..."
                        />


                        <input
                            type="text"
                            placeholder="Location"
                        />


                        <button>
                            Search Jobs
                        </button>

                    </div>




                    <div className="hero-buttons">

                        <button>
                            Find Jobs
                        </button>

                        <p>
                            (If you want to seek employees for your company,
                            please contact the Admin for registration.)
                        </p>

                    </div>




                    <div className="companies">

                        <h5>
                            Trusted By Top Companies
                        </h5>


                        <div className="company-names">

                            <span>Google</span>{" "}
                            <span>Microsoft</span>{" "}
                            <span>Amazon</span>{" "}
                            <span>TCS</span>{" "}
                            <span>Infosys</span>

                        </div>


                    </div>


                </div>


            </div>




            {/* Why Us Section */}
            <div id="whyus">

                <h2>
                    Why Choose CareerDart?
                </h2>


                <p>
                    CareerDart helps job seekers discover the right opportunities and
                    helps employers find skilled talent efficiently. Our platform connects
                    careers and companies through a simple, reliable, and transparent hiring process.
                </p>


                <p>
                    Whether you are looking for your first job, a career change, or the
                    perfect candidate for your organization, CareerDart makes the journey easier.
                </p>


            </div>





            {/* About Section */}
            <div id="about">


                <h2>
                    About CareerDart
                </h2>


                <p>
                    CareerDart is a modern job portal designed to bridge the gap between
                    job seekers and employers. We provide a platform where users can explore
                    job opportunities, manage applications, and build better career paths.
                </p>




                <h2>
                    Contact Us
                </h2>


                <p>
                    Email: support@careerdart.com
                </p>


                <p>
                    Phone: +1(212)555-0174
                </p>


                <p>
                    Address: CareerDart Headquarters, New York
                </p>


            </div>





            {/* Footer */}
            <div className="footer">

                <div>
                    © CareerDart
                </div>

            </div>



        </>
    )

}


export default LandingPage;