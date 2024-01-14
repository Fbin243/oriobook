<template>
  <section class="sales-page container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="dashboard col-9">
        <div class="js-dashboard-container">
          <section class="dashboard-general col-8 mx-auto">
            <ul class="dashboard-general-list row gx-0 mb-5">
              <li
                class="dashboard-general-item col d-flex flex-column align-items-center"
              >
                <p class="dashboard-general-title d-flex align-items-center">
                  <i class="fa-solid fa-money-bill-wave text-center"></i>
                  <span>Total Income</span>
                </p>
                <p class="dashboard-general-content fw-bold">
                  {{ totalIncome }}$
                </p>
              </li>
              <li
                class="dashboard-general-item col d-flex flex-column align-items-center"
              >
                <p class="dashboard-general-title d-flex align-items-center">
                  <i class="fa-solid fa-truck text-center"></i>
                  <span>Total Orders</span>
                </p>
                <p class="dashboard-general-content fw-bold">
                  {{ totalOrder }}
                </p>
              </li>
              <li
                class="dashboard-general-item col d-flex flex-column align-items-center"
              >
                <p class="dashboard-general-title d-flex align-items-center">
                  <i class="fa-solid fa-box-open text-center"></i>
                  <span>Total Stock</span>
                </p>
                <p class="dashboard-general-content fw-bold">
                  {{ totalStock }}
                </p>
              </li>
            </ul>
            <ul class="dashboard-general-list row gx-0 mb-5">
              <li
                class="dashboard-general-item col d-flex flex-column align-items-center"
              >
                <p class="dashboard-general-title d-flex align-items-center">
                  <i class="fa-solid fa-comments text-center"></i>
                  <span>Total Reviews</span>
                </p>
                <p class="dashboard-general-content fw-bold">
                  {{ totalReview }}
                </p>
              </li>
              <li
                class="dashboard-general-item col d-flex flex-column align-items-center"
              >
                <p class="dashboard-general-title d-flex align-items-center">
                  <i class="fa-sharp fa-solid fa-badge-check text-center"></i>
                  <span>Successful Orders</span>
                </p>
                <p class="dashboard-general-content fw-bold">
                  {{ successOrder }}
                </p>
              </li>
              <li
                class="dashboard-general-item col d-flex flex-column align-items-center"
              >
                <p class="dashboard-general-title d-flex align-items-center">
                  <i class="fa-solid fa-star text-center"></i>
                  <span>Average Rating</span>
                </p>
                <p class="dashboard-general-content fw-bold">{{ avgRating }}</p>
              </li>
            </ul>
          </section>
          <div class="row w-100 justify-content-between">
            <div id="chartContainer1" class="col-5" style="height: 370px"></div>
            <div id="chartContainer2" class="col-6" style="height: 370px"></div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "../../config/axios";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
  setup() {
    const categories = ref([]);
    const authors = ref([]);
    const totalIncome = ref(0);
    const totalOrder = ref(0);
    const successOrder = ref(0);
    const totalStock = ref(0);
    const totalReview = ref(0);
    const avgRating = ref(0);

    onMounted(async () => {
      try {
        displayLoading(".js-dashboard-container", -50);
        let response = await axios.get(
          "https://localhost:3000/product/dashboard"
        );
        categories.value = response.data.categories;
        authors.value = response.data.authors;
        totalIncome.value = response.data.totalIncome;
        totalOrder.value = response.data.totalOrder;
        successOrder.value = response.data.successOrder;
        totalStock.value = response.data.totalStock;
        totalReview.value = response.data.totalReview;
        avgRating.value = response.data.avgRating;
        removeLoading();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }

      // Xử lí mảng authors thành các datapoints
      const AuthorDataPoints = [];
      for (let author of authors.value) {
        AuthorDataPoints.push({ y: author.published_book, label: author.name });
      }

      // Xử lí mảng categories thành các datapoints
      const CategoryDataPoints = [];
      for (let cate of categories.value) {
        // Duyệt qua từng sub categories
        for (let subCate of cate.sub_category) {
          CategoryDataPoints.push({
            y: subCate._id.num_product,
            label: cate.name + " / " + subCate._id.name,
          });
          // Trừ đi các sub_cate
          cate.num_product -= subCate._id.num_product;
        }
        CategoryDataPoints.push({ y: cate.num_product, label: cate.name });
      }
      $(() => {
        // Pie chart
        const chart1 = new CanvasJS.Chart("chartContainer1", {
          animationEnabled: true,
          title: {
            text: "Authors",
            fontFamily: "Jost, sans-serif",
            fontSize: 20,
            fontWeight: 600,
          },
          data: [
            {
              type: "pie",
              startAngle: 240,
              yValueFormatString: '##0.00"%"',
              indexLabel: "{label} {y}",
              dataPoints: AuthorDataPoints,
            },
          ],
        });
        chart1.render();

        // Bar chart
        const chart2 = new CanvasJS.Chart("chartContainer2", {
          animationEnabled: true,

          title: {
            text: "Categories",
            fontFamily: "Jost, sans-serif",
            fontSize: 20,
            fontWeight: 600,
          },
          axisX: {
            interval: 1,
          },
          axisY2: {
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
          },
          data: [
            {
              type: "bar",
              name: "companies",
              axisYType: "secondary",
              color: "#014D65",
              dataPoints: CategoryDataPoints,
            },
          ],
        });
        chart2.render();
      });
    });

    return {
      totalIncome,
      totalOrder,
      successOrder,
      totalStock,
      totalReview,
      avgRating,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/dashboard.scss";
</style>
