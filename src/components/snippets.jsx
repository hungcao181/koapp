            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='RoomQuickAdd' encType='multipart/form-data' action = '/rooms' method='post'>
                        <input type="text" name='title' label="Title" placeholder="Enter title"/><br/>
                        file: <input type="file" name='image' label="File" help="[Optional] Block level help text"/><br/>
                        <input type="textarea" name='description' label="Description" placeholder="Enter description"/><br/>
                        <input type="text" name='price' label="Price" placeholder="Enter price"/><br/>
                        <input type="text" name='MinimumAmount' label="MinimumAmount" placeholder="Enter MinimumAmount"/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <form id='aRoomQuickAdd' name='roomInfo' encType='multipart/form-data' method='post' onSubmit={this._onSubmit}>
                        <input type="text" name='title' label="Title" placeholder="Enter title" onChange={this._onInputsChange}/>
                        <input type="file" name='image' label="File" help="[Optional] Block level help text" onChange={this._onInputsChange}/>
                        <input type="textarea" name='description' label="Description" placeholder="Enter description" onChange={this._onInputsChange}/>
                        <input type="text" name='price' label="Price" placeholder="Enter price" onChange={this._onInputsChange}/>
                        <input type="text" name='MinimumAmount' label="MinimumAmount" placeholder="Enter MinimumAmount" onChange={this._onInputsChange}/>
                        <input type="submit" value="Submit Button" />
                    </form>

                    <Button onClick={this.save}>Save</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>

        <form id="loginForm" action="/authenticate" method="post">
            <input type="text" name="username" label="User Name" placeholder="Enter your username"/>
            <input type="password" name="password" label="Password" placeholder="Your password"/>
            <input type="submit" value="Login"/>
        </form>


    authenticate: function* (next) {
        let parts = mediaParse(this, {
            autoFields: true
        });
        let user = {},
            message = '',
            token;
        parts.fields.forEach(function (f) {
            user[f[0]] = f[1];
        });
        console.log(parts.fields,'---', user);
        let recs = yield users.find({'username': user.username, 'password': user.password});
        if (recs.length > 0) {
            message = 'welcome back!' + user.username;
            token = koajwt.sign({username: user.username}, 'secretkey', {expiresInMinutes: 1440});
        } else {
            message = 'Not found';
        }
        // this.state.token = token;
        this.body = {message: message, token: token};
        // this.redirect('/karaoke');
    }



    <layout-put into="script">
        <script>
                            
            function login() {
                //var data = new FormData(document.getElementById('loginForm'));
                var fields = $("#loginForm").serializeArray();
                var data = {};
                $.each(fields, function (i, f) {
                    data[f.name] = f.value;
                });
                console.log('data ', data);
                $.ajax({
                    url: '/authenticate',
                    type: 'post',
                    data: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).done(function (body) {
                    console.log('body: ', body);
                    if (body.token) {
                        localStorage.token = body.token;
                        document.cookie = 'user='+ body.token;
                        window.location = '/karaoke';
                    }
                }).fail(function (err) {
                    console.log('error! ', err);
                });
            }
        </script>
    </layout-put>