<template>
  <body id="poster">
    <div>
      <el-form class="login-container" :model="form" label-width="0px">
        <h2 class="login_title">
          系统登陆
          <el-button @click="toRegister">点我注册</el-button>
        </h2>
        <el-form-item style="width: 100%">
          <el-input
            type="text"
            v-model="loginForm.loginName"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-button class="loginButtom" type="primary" @click="Login()"
          >登录</el-button
        >
      </el-form>
    </div>
  </body>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        loginName: "",
        password: "",
      },
    };
  },
  methods: {
    Login() {
      const formData = new FormData();
      formData.append("loginName", this.loginForm.loginName);
      formData.append("password", this.loginForm.password);

      this.axios
        .post("http://182.92.11.212:8888/sys-user/login", formData)
        //.post("http://localhost:8888/sys-user/login", formData)
        .then((resp) => {
          let data = resp.data;
          if (data) {
            this.loginForm = {};
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            this.$router.push({ path: "/Home" });
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          this.$message.error("登录失败，请重试");
        });
    },

    toRegister() {
      this.$router.push({ path: "/Register" });
    },
  },
};
</script>
<style>
body {
  margin: 0px;
  padding: 0px;
}
.login-container {
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 500px;
  border-radius: 15px;
  background-clip: border-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
/* 标题 */
.login_title {
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
h2 .el-button {
  margin-left: 15px;
}
h2 {
  color: #505658;
}
.loginButtom {
  width: 100%;
  background-color: #505658;
}
</style>
