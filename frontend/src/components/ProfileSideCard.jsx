import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getProfilePicUrl } from "../utils/profilePic";
import LoadingSpinner from "./LoadingSpinner";

function ProfileSideCard({ profile, role }) {
    const navigate = useNavigate();

    if (!profile) {
        return <LoadingSpinner text="Loading profile..." />;
    }

    return (
        <div className="profile-card">
            <div className="profile-card__banner" />
            <div className="profile-card__avatar-wrap">
                <img
                    className="profile-card__avatar"
                    src={getProfilePicUrl(profile.ProfilePic)}
                    alt={profile.Name}
                />
            </div>
            <div className="profile-card__body">
                <h3 className="profile-card__name">{profile.Name}</h3>
                <span className="profile-card__role">{role}</span>
                <p className="profile-card__email">{profile.Email}</p>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/updateProfile")}
                >
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}

export default ProfileSideCard;
