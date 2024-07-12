import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';  // Import the CSS file for custom styles

function Home() {
    return (
        <div className="card-container">
            <Card className="custom-card">
                <Card.Body>
                    <h3 style={{ textAlign: 'center' }}>Personalised Search</h3>
                    <Card.Text style={{ textAlign: 'center' }}>
                    The tool will encapsulate automated services that may also be integrated into bulk annotation pipelines. Our target users are biomedical researchers, domain knowledge-base curators, and specialized search engine system builders. Our tool will offer a streamlined interface for individual users (see Figure 7) with several prac- tical functionalities. First, our tool will allow users to easily curate articles, perform various kinds of analysis, and download the end results. Second, the results can be readily shared through a web service endpoint, enabling collaborative curation of scientific literature. Third, users will be able to activate a personalized digest to classify the newly published literature automatically anytime.
                        {/* BioXplorer will allow the users
                        to upload and integrate their in-house articles with
                        the existing biomedical knowledge bases and enable them
                        to perform personalized queries
                        to fulfill their specific analysis
                        goals. First, the user uploads these in-house articles to the BioXplorer via its web interface.
                        Next, this customized dataset is integrated with the constructed
                        multidimensional knowledge network and the
                        concept-pair associations are ranked. Discovering meaningful associations by integrating the users personalized findings/data with the existing knowledge network can be powerful in accelerating the pace of scientific discovery. Notably, without such form of personalized integration offered by the proposal tool, the users would not be able to generate valuable insights. */}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="custom-card">
                <Card.Body>
                    <h3 style={{ textAlign: 'center' }}>Evaluation of BioXplorer</h3>
                    <Card.Text style={{ textAlign: 'center' }}>
                        We will collect system usage data on a regular basis, such as the number of registered users who have used our tool at least once, the number of active users who log in and use the tool regularly for their applications, the geographic distribution of the users, the average number of collaborating users for each task on the platform, the lifetime of the engagement for each task, the number of citations to our platform, and the number of people attending our training workshops and community outreach.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="custom-card">
                <Card.Body>
                    <h3 style={{ textAlign: 'center' }}>Sustainability of BioXplorer</h3>
                    <Card.Text style={{ textAlign: 'center' }}>
                        Our goal is to continually seek funding and partnerships for supporting the system, maintaining a healthy community to use the platform, and constantly analyzing the risks and technology updates
                        to adapt to new products. We are particularly interested in partnering with large-scale curation efforts, and have taken steps in this direction already (see letters of support).
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;
