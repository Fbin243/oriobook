<template>
    
    <div class="container">
    <img src="../assets/img/email.jpg" alt="Large Picture">
    <div class="centered-div">
        <div class="inner-left">
            <!-- Content of the left div goes here -->
            <h1 style="font-weight: 100;font-size: 50px;">Get a 100% discount<br> on your
                first order!</h1>
        </div>
        <div class="inner-right">
            <!-- Content of the right div goes here -->
            
            <form class="form-inline">
                <div class="form-group mr-2">
                    <input type="text" class="form-control" placeholder="Enter your email...">
                </div>
                <button type="submit" class="button"><i class="fa-regular fa-envelope"></i> Submit</button>

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
   