<template>
  <section class="sales-page container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="dashboard col-9">
        <!-- <p class="dashboard-breadcrumb">Dashboard</p> -->
        <section class="dashboard-general col-8 mx-auto">
          <ul class="dashboard-general-list row gx-0 mb-5">
            <li
              class="dashboard-general-item col d-flex flex-column align-items-center"
            >
              <p class="dashboard-general-title d-flex align-items-center">
                <i class="fa-solid fa-money-bill-wave text-center"></i>
                <span>Total Income</span>
              </p>
              <p class="dashboard-general-content fw-bold">12000000</p>
            </li>
            <li
              class="dashboard-general-item col d-flex flex-column align-items-center"
            >
              <p class="dashboard-general-title d-flex align-items-center">
                <i class="fa-solid fa-truck text-center"></i>
                <span>Total Orders</span>
              </p>
              <p class="dashboard-general-content fw-bold">34</p>
            </li>
            <li
              class="dashboard-general-item col d-flex flex-column align-items-center"
            >
              <p class="dashboard-general-title d-flex align-items-center">
                <i class="fa-solid fa-box-open text-center"></i>
                <span>Total Stock</span>
              </p>
              <p class="dashboard-general-content fw-bold">5534</p>
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
              <p class="dashboard-general-content fw-bold">123234</p>
            </li>
            <li
              class="dashboard-general-item col d-flex flex-column align-items-center"
            >
              <p class="dashboard-general-title d-flex align-items-center">
                <i class="fa-sharp fa-solid fa-badge-check text-center"></i>
                <span>Successful Orders</span>
              </p>
              <p class="dashboard-general-content fw-bold">23</p>
            </li>
            <li
              class="dashboard-general-item col d-flex flex-column align-items-center"
            >
              <p class="dashboard-general-title d-flex align-items-center">
                <i class="fa-solid fa-star text-center"></i>
                <span>Average Rating</span>
              </p>
              <p class="dashboard-general-content fw-bold">4.5</p>
            </li>
          </ul>

          <section
            class="d-flex align-items-center margin-top: 3rem; margin-left: 2rem;"
          >
            <div
              class="pie animate no-round"
              style="--p: 40; font-size: 3rem; margin: 0 2rem"
            >
              40%
            </div>

            <section id="skills" class="toad-fullscreen">
              <article class="skills">
                <div class="t-6">
                  <p>
                    40 Romance<span></span
                    ><span class="skills" style="width: 20%"></span>
                  </p>
                </div>
                <div class="t-6">
                  <p>
                    30 Fiction<span></span
                    ><span class="skills" style="width: 40%"></span>
                  </p>
                </div>

                <div class="t-6">
                  <p>
                    30 Family Story<span></span
                    ><span class="skills" style="width: 20%"></span>
                  </p>
                </div>
                <div class="t-6">
                  <p>
                    30 Comedy<span></span
                    ><span class="skills" style="width: 30%"></span>
                  </p>
                </div>
                <div class="t-6">
                  <p>
                    30 History<span></span
                    ><span class="skills" style="width: 20%"></span>
                  </p>
                </div>
                <div class="t-6">
                  <p>
                    30 Others<span></span
                    ><span class="skills" style="width: 50%"></span>
                  </p>
                </div>
              </article>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/dashboard.scss";
</style>
