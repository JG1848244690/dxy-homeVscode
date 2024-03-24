<template>
  <div id="poster">
    <el-form
      class="register-container"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
    >
      <h2 class="register_title">
        系统注册
        <el-button @click="toLogin()">去登录</el-button>
      </h2>

      <el-form-item prop="loginName">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model="ruleForm.loginName"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model.number="ruleForm.name"
          placeholder="请输入网名"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input
          prefix-icon="el-icon-lock"
          placeholder="请确认密码"
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="registerButtom"
          type="primary"
          style="background: #505458; border: none"
          @click="submitForm('ruleForm')"
          >注册</el-button
        >
        <el-button class="resetButtom" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        loginName: "",
        name: "",
        password: "",
        checkPass: "",
      },
      rules: {
        loginName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 9, message: "长度2-9个字符", trigger: "blur" },
        ],

        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/" });
    },
    submitForm(ruleForm) {
      const formData = new FormData();
      formData.append("loginName", this.ruleForm.loginName);
      formData.append("name", this.ruleForm.name);
      formData.append("password", this.ruleForm.password);

      this.axios
        .post("http://182.92.11.212:8888/sys-user/register", formData)
       // .post("http://localhost:8888/sys-user/register", formData)
        .then((resp) => {
          let success = resp.data;
          if (success) {
            this.ruleForm = {};
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.$router.push({ path: "/Home" });
          } else {
            this.$message.error("注册失败，请重试");
          }
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          this.$message.error("注册失败，请重试");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
body {
  margin: 0px;
  padding: 0px;
}
.register-container {
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
.register_title {
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
</style>