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
