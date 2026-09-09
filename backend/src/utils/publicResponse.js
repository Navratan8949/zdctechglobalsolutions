const mediaUrl = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.url || value.secure_url || "";
};

const normalizePublicItem = (item) => {
    const data = typeof item.toObject === "function" ? item.toObject({ virtuals: true }) : { ...item };

    ["image", "coverImage", "avatar", "logo", "resume", "profileImage"].forEach((field) => {
        if (data[field]) {
            data[field] = mediaUrl(data[field]);
        }
    });

    if (data.author?.avatar) {
        data.author.avatar = mediaUrl(data.author.avatar);
    }

    return data;
};

const normalizePublicItems = (items) => items.map(normalizePublicItem);

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
