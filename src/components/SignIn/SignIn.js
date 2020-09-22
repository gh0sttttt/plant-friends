import React from 'react';
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      token: ''
    };
  }
  // Email Input Event
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  // Password Input Event
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  // Submit Sign in Event && route
  onSubmitSignIn = () => {
    fetch('https://pacific-shore-35638.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };


  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="ba mv4 w-100 w-50-m w-25-l mw5 center" >
        <main className="pa4">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">sign in</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-black white hover-bg-white w-100" type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange} />

              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-black white hover-bg-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba grow bg-transparent white f6 dib pointer" type="submit" value="Sign in" onClick={this.onSubmitSignIn} />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim white db pointer">Register</p>
            </div>
          </div>
        </main>
      </article >

    );
  }

};

export default SignIn;