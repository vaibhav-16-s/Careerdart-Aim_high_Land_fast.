const API_BASE = "http://localhost:5000";

export function getProfilePicUrl(pic) {
    if (!pic || pic === "default.png") {
        return "https://via.placeholder.com/150?text=No+Photo";
    }

    if (pic.startsWith("http")) {
        return pic;
    }

    if (pic.startsWith("uploads/")) {
        return `${API_BASE}/${pic}`;
    }

    if (pic.startsWith("profiles/")) {
        return `${API_BASE}/uploads/${pic}`;
    }

    return `${API_BASE}/uploads/profiles/${pic}`;
}

export function getResumeUrl(filename) {
    if (!filename) return "#";
    if (filename.startsWith("http")) return filename;
    if (filename.startsWith("uploads/")) return `${API_BASE}/${filename}`;
    return `${API_BASE}/uploads/resumes/${filename}`;
}
