const mediaUrl = (value) => {
    if (!value) return "";
    let url = "";
    if (typeof value === "string") {
        url = value;
    } else {
        url = value.url || value.secure_url || "";
    }
    if (url && url.includes("localhost:8000")) {
        url = url.replace("localhost:8000", `localhost:${process.env.PORT || 8002}`);
    }
    return url;
};

const normalizePublicItem = (item, isAdmin = false) => {
    const data = typeof item.toObject === "function" ? item.toObject({ virtuals: true }) : { ...item };

    if (!isAdmin) {
        ["image", "coverImage", "avatar", "logo", "resume", "profileImage"].forEach((field) => {
            if (data[field]) {
                data[field] = mediaUrl(data[field]);
            }
        });

        if (data.author?.avatar) {
            data.author.avatar = mediaUrl(data.author.avatar);
        }
    } else {
        ["image", "coverImage", "avatar", "logo", "resume", "profileImage"].forEach((field) => {
            if (data[field]) {
                if (typeof data[field] === "string" && data[field].includes("localhost:8000")) {
                    data[field] = data[field].replace("localhost:8000", `localhost:${process.env.PORT || 8002}`);
                } else if (data[field]?.url && data[field].url.includes("localhost:8000")) {
                    data[field].url = data[field].url.replace("localhost:8000", `localhost:${process.env.PORT || 8002}`);
                }
            }
        });

        if (data.author?.avatar) {
            if (typeof data.author.avatar === "string" && data.author.avatar.includes("localhost:8000")) {
                data.author.avatar = data.author.avatar.replace("localhost:8000", `localhost:${process.env.PORT || 8002}`);
            } else if (data.author.avatar?.url && data.author.avatar.url.includes("localhost:8000")) {
                data.author.avatar.url = data.author.avatar.url.replace("localhost:8000", `localhost:${process.env.PORT || 8002}`);
            }
        }
    }

    return data;
};

const normalizePublicItems = (items, isAdmin = false) => items.map(item => normalizePublicItem(item, isAdmin));

const mediaObject = (value) => {
    if (!value) return value;
    if (typeof value === "string") {
        return { public_id: "", url: value };
    }
    return value;
};

const normalizeMediaPayload = (body) => {
    const data = { ...body };

    ["image", "coverImage", "avatar", "logo", "resume", "profileImage"].forEach((field) => {
        if (data[field]) {
            data[field] = mediaObject(data[field]);
        }
    });

    if (data.author?.avatar) {
        data.author = {
            ...data.author,
            avatar: mediaObject(data.author.avatar),
        };
    }

    return data;
};

module.exports = {
    mediaUrl,
    normalizeMediaPayload,
    normalizePublicItem,
    normalizePublicItems,
};
