<template>
  <section class='vh-100' style='background-color: #DFF1ED'>
    <div class='container py-5 h-100'>
      <div class='row d-flex justify-content-center align-items-center h-100'>
        <div class='col col-xl-10'>
          <div class='cardauth' style='border-radius: 1rem'>
            <div class='row g-0'>
              <div class='authimg col-md-6 col-lg-5 d-none d-md-block'>
              </div>
              <div class='col-md-6 col-lg-7 d-flex align-items-center'>
                <div class='card-body p-4 p-lg-5 text-black'>
                  <form>
                    <div class='d-flex align-items-center mb-3 pb-1'>
                      <span class='h1 fw mb-0'
                        >Welcome to your Daily Planner</span
                      >
                    </div>

                    <h5 class='fw-normal mb-3 pb-3' style='letter-spacing: 1px'>
                      Sign in to your account
                    </h5>

                    <div class='form-outline mb-4'>
                      <label class='form-label' for='form2Example17'
                        >Email address
                        <input
                          type='email'
                          id='form2Example17'
                          class='form-control form-control-lg'
                          v-model='userEmail'
                          placeholder='email@email.com'
                          required
                        />
                      </label>
                    </div>
 <div class='msg'>{{ logmessage }}</div>
                    <div class='form-outline mb-4'>
                      <label class='form-label' for='form2Example27'
                        >Password
                        <input
                          type='password'
                          id='form2Example27'
                          class='form-control form-control-lg'
                          v-model='userPassword'
                          placeholder= 'Password'
                        />
                      </label>
                    </div>
                    <div class='pt-1 mb-4'>
                      <button
                        class='btn btn-primary btn-lg btn-block'
                        type='button'
                        @click='handleSignIn'
                      >
                        Sign In
                      </button>
                    </div>
                    <label for='checkbox' class='checkbox-wrap checkbox-primary'
                      >Remember Me
                      <input type='checkbox' checked='' />
                      <span class='checkmark'></span>
                    </label>
                    <p>
                      Don't have an account?
                      <router-link class='link-primary' to='/signup'
                        >Register here</router-link
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  data() {
    return {
      userPassword: '',
      userEmail: '',
      logmessage: '',
    };
  },

  computed: {
    ...mapState(userStore, ['user', 'errorMsg']),
  },
  methods: {
    ...mapActions(userStore, ['signIn', 'fetchUser']),
    validateUserEmail(value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.logmessage = '';
      } else {
        this.logmessage = 'Please, enter a valid email!';
      }
    },
    validatePassword(value) {
      const difference = 6 - value.length;
      if (value.length < 6) {
        this.message = `The password must have at least 6 characters! + ${difference} + characters left`;
      } else {
        this.message = '';
      }
    },
    validateUserPassword(value) {
      const difference = 6 - value.length;
      if (value.length < 6) {
        this.logmessage = `The password must have 6 characters! + ${difference} + characters left`;
      } else {
        this.logmessage = '';
      }
    },
    async handleSignIn() {
      try {
        await this.signIn(this.userEmail, this.userPassword);
      } catch (error) {
        this.logmessage = 'Please, check that your user name and password are correct or create an account below!';
      }
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ path: '/' });
      }
    },
    userEmail(value) {
      // binding this to the data value in the email input
      this.userEmail = value;
      this.validateUserEmail(value);
    },
    userPassword(value) {
      this.userPassword = value;
      this.validateUserPassword(value);
    },
  },
};
</script>
<style>
.cardauth {
  background-color: whitesmoke;
  background-repeat: no-repeat;
  background-size: cover;
}
.msg {
  color: red;
  margin-top: 10px;
}
p {
  margin-top: 20px;
}
.checkbox-wrap {
  margin-top: 10px;
}
.authimg {
  background-image: url('../assets/pens.webp');
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1rem 0 0 1rem;
}
</style>
