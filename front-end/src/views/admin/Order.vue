<template>
  <section class="login container">
    <div class="row">
      <div class="col-6">
        <img src="@/assets/img/login.jpeg" alt="Login image" />
      </div>
      <div class="col-6">
        <div class="container-form">
          <h2 class="text-title-heading">My Account</h2>
          <div class="box-form-login">
            <div class="title-form">Login</div>
            <div class="box-content">
              <div class="form-login">
                <form method="post" class="login">
                  <div class="username">
                    <input
                      type="text"
                      class="input-text"
                      placeholder="Username or email address*"
                      name="username"
                      id="username"
                    />
                  </div>
                  <div class="password">
                    <input
                      class="input-text"
                      type="password"
                      placeholder="Password*"
                      name="password"
                      id="password"
                    />
                  </div>
                  <div class="rememberme-lost">
                    <div class="rememberme">
                      <input
                        name="rememberme"
                        type="checkbox"
                        id="rememberme"
                        value="forever"
                      />
                      <label for="rememberme" class="inline">Remember me</label>
                    </div>
                    <div class="lost-password">
                      <a
                        href="https://wpbingosite.com/wordpress/oriobook/my-account/lost-password/"
                        >Lost your password?</a
                      >
                    </div>
                  </div>
                  <div class="button-login">
                    <input
                      type="hidden"
                      id="woocommerce-login-nonce"
                      name="woocommerce-login-nonce"
                      value="839411776f"
                    /><input
                      type="hidden"
                      name="_wp_http_referer"
                      value="/wordpress/oriobook/my-account/"
                    />
                    <input
                      type="submit"
                      class="button"
                      name="login"
                      value="Login"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="box-form-login">
            <div class="title-form register">Register</div>
            <div class="box-content">
              <div class="form-register">
                <form method="post" class="register">
                  <div class="email">
                    <input
                      type="email"
                      class="input-text"
                      name="email"
                      placeholder="Email address*"
                      id="reg_email"
                      value=""
                    />
                  </div>
                  <div class="password">
                    <input
                      type="password"
                      class="input-text"
                      placeholder="Password*"
                      name="password"
                      id="reg_password"
                    />
                  </div>
                  <div class="woocommerce-privacy-policy-text"></div>
                  <div class="button-register">
                    <input
                      type="hidden"
                      id="woocommerce-register-nonce"
                      name="woocommerce-register-nonce"
                      value="11ac8075a2"
                    /><input
                      type="hidden"
                      name="_wp_http_referer"
                      value="/wordpress/oriobook/my-account/"
                    />
                    <input
                      type="submit"
                      class="button"
                      name="register"
                      value="Register"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Manage",
};
</script>

<style lang="scss" scoped></style>
