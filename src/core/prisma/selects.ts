export const selectUser = {
    id: true,
    email: true,
    phone: true,
    firstName: true,
    lastName: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true,
};

export const selectExecutor = {
    id: true,
    workFormat: true,
    experience: true,
    about: true,
    companyName: true,
    description: true,
    city: true,
    rating: true,
    completedOrders: true,
};

export const selectCustomer = {
    id: true,
};

export const selectAdmin = {
    id: true,
};

// Address
export const selectAddress = {
    id: true,
    value: true,
    city: true,
    postalCode: true,
    coordinates: true,
    isDefault: true,
    createdAt: true,
};

// Service
export const selectService = {
    id: true,
    name: true,
    priority: true,
    createdAt: true,
};

// File
export const selectFile = {
    id: true,
    url: true,
    filename: true,
    mimetype: true,
    type: true,
    size: true,
    uploadedAt: true,
};

// Report
export const selectReport = {
    id: true,
    text: true,
    createdAt: true,
    files: {select: selectFile},
};

// Message
export const selectMessage = {
    id: true,
    text: true,
    createdAt: true,
    sender: {select: selectUser},
    files: {select: selectFile},
};

// Chat
export const selectChat = {
    id: true,
    type: true,
    createdAt: true,
    order: {
        select: {
            id: true,
            title: true,
            status: true,
        },
    },
    participants: {
        select: {
            user: {select: selectUser},
        },
    },
};

// ChatParticipant
export const selectChatParticipant = {
    id: true,
    chatId: true,
    userId: true,
    user: {select: selectUser},
};

export const selectOrder = {
    id: true,
    title: true,
    objectType: true,
    comment: true,
    distanceToSeptic: true,
    septicDepth: true,
    septicVolume: true,
    septicConstructionType: true,
    paymentMethod: true,
    workDate: true,
    status: true,
    priority: true,
    price: true,
    city: true,
    createdAt: true,
    updatedAt: true,
    service: {select: selectService},
    customer: {select: selectUser},
    executor: {select: selectUser},
    reports: {select: selectReport},
    chats: {
        select: {
            id: true,
            type: true,
            createdAt: true,
        },
    },
};
