import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getProfilePicUrl } from "../utils/profilePic";

function ProfileSideCard({ profile, role }) {

    const navigate = useNavigate();

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <Card>
            <Card.Body className="text-center">
                <img
                    src={getProfilePicUrl(profile.ProfilePic)}
                    alt={profile.Name}
                    width="120"
                    height="120"
                />
                <Card.Title>{profile.Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
                <Card.Text>
                    <strong>Email:</strong><br />
                    {profile.Email}
                </Card.Text>
                <Button variant="outline-primary" size="sm" onClick={() => navigate("/updateProfile")}>
                    Edit Profile
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProfileSideCard;
