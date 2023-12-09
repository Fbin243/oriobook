const displayLoading = (container, top = 0, left = 0) => {
  $(container).css({
    position: "relative",
  });
  $(container).append(`
    <div class="w-100 text-center mt-5 loading-screen" style="top: ${top}px; left: ${left}px">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `);
};

const removeLoading = () => {
  setTimeout(() => {
    $(".loading-screen").remove();
  }, 500);
};

module.exports = {
  displayLoading,
  removeLoading,
};
