<template>
 <div class="grid-container">
        <!-- First Column -->
        <div class="big-card">
            <img src="../assets/img/56732449.jpg" style="width: 60%;padding-top:100px; padding-bottom:100px;">
            <h2> Romanace</h2>
        </div>

        <!-- Second Column -->
        <div class="small-card">            
            <img src="../assets/img/fic1.jpg" style="width: 25%; padding-bottom:50px;padding-left: 20px;">
            <img src="../assets/img/fic2.jpg" style="width: 25%; padding-bottom:50px;padding-left: 20px;">
            <img src="../assets/img/fic3.jpg" style="width: 25%; padding-bottom:50px;padding-left: 20px; height: 300px;">
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> Fiction</h2>
        </div>

        <div class="small-card">
            <div style="text-align: right">
            <img src="../assets/img/download.jpg" style="width: 45%; padding-top:50px;padding-right: 50px;">
            </div>   
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> Family</h2>
        </div>

        <!-- Third Column -->

        <div class="small-card">
            <div style="text-align: right">
            <img src="../assets/img/comedy.jpg" style="width: 45%; padding-top:50px;padding-right: 50px;">
            </div>   
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> Comedy</h2>
        </div>

        <div class="small-card">
            <h2>Small Card 6</h2>
            <p>This is the content of small card 6.</p>
        </div>
    </div>

</template>

<script>
export default {
 name: "Category",
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/Category.scss";
</style>
