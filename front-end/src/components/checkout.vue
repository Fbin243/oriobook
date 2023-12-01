<template>
    <div class=""
        style="margin-left: 30px; margin-top: 30px; width: 1600px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 260px;">
        <div class="row" style="width: 100%;">
            <div class="col-8" style=" position: relative;">
                <!-- Content for the 60% width div -->
                <div
                    style="display: flex; justify-content: center; align-items: center; width: 400px; height: 50px; background-color: #f2f2f2; font-size: 17px;">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>ㅤReturning Customer?ㅤ
                    <a href="">Click Here To Login</a>
                </div>
                <div
                    style="position: absolute; right: 30px; top: 0; display: flex; justify-content: center; align-items: center; width: 400px; height: 50px; background-color: #f2f2f2; font-size: 17px;">
                    <i class="fa-solid fa-tag"></i>ㅤHave a coupon?ㅤ
                    <a id="coupon-link" @click="toggleCoupon" style="   text-decoration: underline;cursor: pointer;">Click
                        Here To Enter Your Code</a>
                </div>
                <div class="coupon-content" id="coupon-content"
                    style="display: none;width: 400px;height: 200px;background-color: #ffffff;box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
                                      position: absolute;right: 30px;z-index: 50;text-align: center;justify-content: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 400px;">
                        <label for="coupon-code" style="padding-top: 50px;padding-bottom: 50px;font-size: 15px;">If you have
                            a coupon code, please apply it below.</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="coupon-code" placeholder="Coupon code..."
                                style=":width: 300px;padding-left: 10px;">
                            <button @click="applyCoupon" class="btn" style="width: 100px;height:50px">Apply</button>
                        </div>
                    </div>

                </div>
                <div style="margin-top: 30px;">
                    <h4 style="font-weight: 400;font-size: 23px;"> Billing details </h4>
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> First name *</h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Last name *</h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Company name (optional) </h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Country / Region *
                    </h6>

                    <div class="input-group mb-3">
                        <select class="form-select" id="inputGroupSelect02">
                            <option selected>VietNam</option>
                            <option value="1">USA</option>
                            <option value="2">UK</option>
                            <option value="3">China</option>
                            <option value="3">ThaiLand</option>
                            <option value="3">South Korea</option>
                            <option value="3">North Korea</option>
                        </select>
                    </div>
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Street address * </h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;">Postcode / ZIP (optional) </h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Town / City * </h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Phone *</h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Email address * </h6>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default">
                    <br>
                    <h4 style="font-weight: 400;font-size: 23px;">Ship to a different address? </h4> <br>
                    <h6 style="font-weight: 400;font-size: 17px;"> Order notes (optional)</h6>
                    <textarea class="form-control" aria-label="With textarea"
                        placeholder="Note about your delivery (eg. free,..)" style="padding-top: 15px;"></textarea>


                </div>
            </div>
            <div class="col-4" style="padding-left: 30px;padding-right: 30px;padding-top: 30px;border: 1px solid black;">
                <h4 style="font-family: Jost, sans-serif;font-weight: 400;font-size: 23px;"> Product </h4>
                <div style=" user-select: none;">__________________________________________</div>
                <div style="position: relative;margin-top: 40px;">
                    <img src="../assets/img/products/product-106.jpg" style="width: 30%;">
                    <div style="position: absolute;top:0;left: 130px;">Andromeda - 2023<br>
                        110.00$<br>
                        <div style="font-weight: 500;">QTY : 2</div>
                    </div>
                </div>
                <div style="position: relative;margin-top: 40px;">
                    <img src="../assets/img/products/product-108.jpg" style="width: 30%;">
                    <div style="position: absolute;top:0;left: 130px;">Andromeda - 2023<br>
                        110.00$<br>
                        <div style="font-weight: 500;">QTY : 2</div>
                    </div>
                </div>
                <div style=" user-select: none;color:rgb(119, 119, 119);">__________________________________________</div>
                <br>
                <div style="position: relative;width: 270px;">
                    <div>Subtotal</div>
                    <div style="position: absolute;font-weight: 700;top:0;right:0">210.00$</div>
                </div><br>
                <div style="position: relative;width: 270px;">
                    <div>Shipping</div>
                    <div style="position: absolute;top:0;right:20px;font-size: 15px;">Flat rate</div>
                </div>
                <div style=" user-select: none;color:rgb(119, 119, 119);">__________________________________________</div>
                <br>
                <div style="background-color:#f2f2f2 ;padding-left: 50px;padding-top: 20px;padding-bottom: 20px;">

                    <form>
                        <label style="
                                        font-size: 16px;font-weight: 500;">
                            <input type="radio" name="options" @click="toggleContent('content1')"> Direct bank transfer
                        </label>
                        <div id="content1" class="hidden" style="display: none;font-size: 16px;color: gray;">
                            <br>Make your payment directly into our bank account. Please use your Order ID as the payment
                            reference. Your order will not be shipped until the funds have cleared in our account.
                        </div>
                        <br><br>

                        <label style="
                                        font-size: 16px;font-weight: 500;">
                            <input type="radio" name="options" @click="toggleContent('content2')"> Check payments
                        </label>
                        <div id="content2" class="hidden" style="display: none;font-size: 16px;color: gray;">
                            <br>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store
                            Postcode.
                        </div>
                        <br><br>

                        <label style="
                                        font-size: 16px;font-weight: 500;">
                            <input type="radio" name="options" @click="toggleContent('content3')"> Cash on delivery
                        </label>
                        <div id="content3" class="hidden" style="display: none;font-size: 16px;color: gray;">
                            <br>Pay with cash upon delivery.
                        </div>
                        <br><br>

                        <label style="
                                        font-size: 16px;font-weight: 500;">
                            <input type="radio" name="options" @click="toggleContent('content4')"> PayPal
                        </label>
                        <div id="content4" class="hidden" style="display: none;font-size: 16px;color: gray;">
                            <br>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
                        </div>
                        <br>
                    </form>
                    

                </div>
                <br><br>
                <button class="btn" style="width: 375px;height:50px">Place Order</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'checkout',
    methods: {
        toggleCoupon() {
            var content = document.getElementById('coupon-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        },
        applyCoupon() {
            // Add your coupon application logic here
            console.log('Coupon applied!');
        },
        toggleContent(contentId) {
            var content = document.getElementById(contentId);
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        },

    },
};
</script>
  
<style lang="scss" scoped>
@import "../styles/checkout.scss";
</style>
  