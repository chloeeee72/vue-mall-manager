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
        <el-button
          class="btn"
          type="primary"
          @click.prevent="submitForm('formdata')"
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
    // 判断用户名格式的方法
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

    // 判断密码格式的方法
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

    // 判断第二次输入密码
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
      // label位置
      labelPosition: "top",

      // 输入的数据
      formdata: {
        username: "",
        password: "",
        checkPass: ""
      },

      res: "",

      // rules:根据以上方法判断输入的数据格式是否正确
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  methods: {
    // 1.登陆请求 2.添加异步 3.验证token
    // 登陆成功 => 在localStorage中存储token => 跳转home => 提示成功
    // 用户没登录,通过url来到页面 => 服务器验证token值
    // 登陆失败 => 提示失败
    async submitForm(formName) {
      const res = await this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.$http.post("login", this.formdata).then(res => {
            // console.log(res);
            this.res = res;
            // 把等号右侧data的值赋值给前面的data
            const {
              data,
              meta: { msg, status }
            } = res.data;
            // =>
            // const { meta: { msg, status } } = { meta: { msg: "11", status: 200 } };
            // =>
            // { msg, status } = {msg:"11",status:200}
            // => msg:11  status:200

            if (status === 200) {
              // 登陆成功 => 在localStorage中存储token => 跳转home => 提示成功 =>
              console.log("login in success => to home page");
              localStorage.setItem("token", data.token);
              // console.log(localStorage.getItem('token'));
              // 路由传参：
              this.$router.push({ name: "home", params: { res: this.res } });
              this.$message({
                type: "success",
                message: msg
              });
            } else if (status === 400) {
              console.log("login in error 400 wrong pwd or wrong user");
              // 登陆失败 => 提示失败
              // 密码错误 用户不存在
              this.$message({
                type: "warning",
                message: msg
              });
            } else {
              console.log("login in error");
              // 其他错误
              this.$message({
                type: "error",
                message: msg
              });
            }
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
