<template>
  <div class="login-wrap">
    <el-form
      :model="formdata"
      status-icon
      :rules="rules"
      ref="formdata"
      label-width="80px"
      class="login-form"
      :label-position="labelPosition"
    >
      <h2>用户信息</h2>

      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="formdata.username"
          autocomplete="off"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="formdata.password"
          autocomplete="off"
          prefix-icon="el-icon-unlock"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="formdata.checkPass"
          autocomplete="off"
          prefix-icon="el-icon-unlock"
        ></el-input>
      </el-form-item>

      <el-form-item class="">
        <el-button class="btn" type="primary" @click="submitForm('formdata')"
          >登录</el-button
        >
        <el-button class="btn" @click="resetForm('formdata')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        // alert(value.length);
        if (value.length > 10 || value.length < 3) {
          callback(new Error("用户名长度3-10位"));
        } else {
          callback();
        }
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formdata.checkPass !== "") {
          this.$refs.formdata.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formdata.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      labelPosition: "top",

      formdata: {
        username: "",
        password: "",
        checkPass: ""
      },

      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  methods: {
    // 登陆请求
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.$http.post("login", this.formdata).then(res => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  width: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  height: 65%;
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}

.btn {
  width: 30%;
  align-items: right;
}
// .prevent -------等于javascript的event.preventDefault()
// 作用：阻止默认程序的运行
</style>
