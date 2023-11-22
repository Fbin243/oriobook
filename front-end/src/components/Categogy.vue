<template>
 <div class="grid-container">
        <!-- First Column -->
        <div class="big-card">            
            <div class="card-content"><a href="#">
            <img src="../assets/img/56732449.jpg" style="width: 60%;padding-top:100px; padding-bottom:100px;">
            <h2> Romanace</h2></a></div>
        </div>

        <!-- Second Column -->
        <div class="small-card">   
            <div class="card-content"><a href="#">         
            <img src="../assets/img/fic1.jpg" style="width: 25%; padding-bottom:50px;padding-left: 20px;">
            <img src="../assets/img/fic2.jpg" style="width: 25%; padding-bottom:50px;padding-left: 20px;">
            <img src="../assets/img/fic3.jpg" style="width: 25%; padding-bottom:50px;padding-left: 20px; height: 300px;">
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> Fiction</h2></a></div>
        </div>

        <div class="small-card">
            <div class="card-content"><a href="#">
            <div style="text-align: right">
            <img src="../assets/img/download.jpg" style="width: 45%; padding-top:50px;padding-right: 50px;">
            </div>   
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> Family</h2></a></div>
        </div>

        <!-- Third Column -->

        <div class="small-card">
            <div class="card-content"><a href="#">
            <div style="text-align: right">
            <img src="../assets/img/comedy.jpg" style="width: 45%; padding-top:50px;padding-right: 50px;">
            </div>   
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> Comedy</h2></a></div>
        </div>

        <div class="small-card">
            <div class="card-content"><a href="#">
            <div style="text-align: right">
            <img src="../assets/img/historyBook.jpg" style="width: 45%; padding-top:50px;padding-right: 50px;">
            </div>   
            <h2 style="text-align: left;padding-left: 50px;padding-bottom: 50px;"> History</h2></a></div>
        </div>
    </div>

</template>

<script>
export default {
 name: "Category",
};
</script>

<style lang="scss" scoped>
@import "../styles/Category.scss";
</style>
