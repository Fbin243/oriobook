<template>
  <section class="faq container mt-5 pt-5">
    <h2 class="faq-title">Frequently Asked Questions.</h2>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            When do I receive my order?
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            When placing the order, a day of shipment is indicated. After the
            order has been placed, the same delivery time will also be stated on
            the order confirmation. It is therefore never possible that during
            the order, the shipping day on the website, is different than on the
            order confirmation.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            I now see the longer delivery time of (a part of) my order. How can
            I cancel it?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            If the order has a longer delivery time than you had previously
            seen, it is of course possible to cancel (a part of) the order. For
            this you can contact our customer service. They will cancel the
            order for you. The purchase amount will be back on your bank account
            within two working days. When an order has already been shipped, it
            can no longer be cancelled
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            When will I receive the invoice for my order?
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            When you have paid for the order, you will not automatically receive
            an invoice for your order. If you wish to receive an invoice, this
            can be done in two ways.The first way is through your account at our
            store. When you log in to your account you can see your orders and
            download the invoice.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            How long will my order take to be delivered?
          </button>
        </h2>
        <div
          id="collapseFour"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut
            pretium libero, non viverra nisl. Maecenas rhoncus erat eget
            vehicula tempor. Mauris sollicitudin, tellus nec feugiat elementum,
            ante sapien sagittis sapien, non convallis velit orci quis nisi. In
            egestas, mauris sit amet pellentesque sollicitudin
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            Do I need to create an account to place an order?
          </button>
        </h2>
        <div
          id="collapseFive"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            Vestibulum in risus dui. Donec malesuada fringilla dui, sed
            porttitor lacus venenatis vel. Integer laoreet lacus ut lacus
            condimentum aliquet. Pellentesque placerat cursus eleifend. Donec
            sed facilisis felis. Praesent lacinia non leo non tristique. Proin
            interdum risus nec tincidunt interdum.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSix"
            aria-expanded="false"
            aria-controls="collapseSix"
          >
            Can I choose my currency I pay in?
          </button>
        </h2>
        <div
          id="collapseSix"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            For UAE, KSA, Kuwait & Qatar: You can choose your country and your
            currency on top of any page to make your navigation easy as well as
            at the checkout point.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FAQ",
};
</script>

<style lang="scss" scoped>
@import "@/styles/faq.scss";
</style>
