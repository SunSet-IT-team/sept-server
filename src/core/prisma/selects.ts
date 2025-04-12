// User
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

// Executor
export const selectExecutor = {
    id: true,
    userId: true,
    workFormat: true,
    experience: true,
    about: true,
    companyName: true,
    description: true,
    city: true,
    rating: true,
    completedOrders: true,
    user: {select: selectUser},
};

// Customer
export const selectCustomer = {
    id: true,
    userId: true,
    user: {select: selectUser},
};

// Admin
export const selectAdmin = {
    id: true,
    userId: true,
    user: {select: selectUser},
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

// Order
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
    createdAt: true,
    updatedAt: true,
    address: {select: selectAddress},
    service: {select: selectService},
    customer: {select: selectCustomer},
    executor: {select: selectExecutor},
    reports: {select: selectReport},
    chats: {
        select: {
            id: true,
            type: true,
            createdAt: true,
        },
    },
};
