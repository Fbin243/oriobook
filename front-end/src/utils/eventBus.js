import mitt from "mitt";

// Tạo một EventBus mới
const eventBus = mitt();

// Export EventBus để sử dụng ở các component khác
export default eventBus;
