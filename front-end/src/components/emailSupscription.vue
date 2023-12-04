<template>
    
    <div class="container">
    <img src="../assets/img/email3.jpg" alt="Large Picture">
    <div class="centered-div">
        <div class="inner-left">
            <!-- Content of the left div goes here -->
            <h1 style="font-family: Lora, serif;color: #242424;font-size: 40px;font-weight: 300;text-align: left;">Get a 100% discount on your
                <br>first order!</h1>
        </div>
        <div class="inner-right">
            <!-- Content of the right div goes here -->
            
            <form class="form-inline">
                <div class="form-group mr-2">
                    <input type="text" class="form-control" placeholder="Enter your email...">
                </div>
                <button type="submit" class="button"><i class="fa-regular fa-envelope"></i> Subscribe</button>

            </form>
        </div>
    </div>
</div>
   </template>
   
   <script>
   export default {
    name: "emailSupscription",
   };
   
   </script>
   
   <style lang="scss" scoped>
   @import "../styles/emailSupscription.scss";
   </style>
   