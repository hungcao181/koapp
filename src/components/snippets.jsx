                <Modal.Body>
                    <form id='RoomQuickAdd' enctype='multipart/form-data' action = '/rooms' method='post'>
                        Title: <input type="text" name='title' label="Title" placeholder="Enter title" onChange={this._onInputsChange}/><br>
                        File: <input type="file" name='image' label="File" help="[Optional] Block level help text" onChange={this._onInputsChange}/><br>
                        Description: <input type="textarea" name='description' label="Description" placeholder="Enter description" onChange={this._onInputsChange}/><br>
                        Price: <input type="text" name='price' label="Price" placeholder="Enter price" onChange={this._onInputsChange}/><br>
                        Minimum Amount: <input type="text" name='MinimumAmount' label="MinimumAmount" placeholder="Enter MinimumAmount" onChange={this._onInputsChange}/><br>
                        <input type="submit" value="Submit" />
                    </form>
                </Modal.Body>

                    <form onSubmit={}>
                        <div className='form-group'>
                            <Input type="text" name='title' label="Title" placeholder="Enter title" onChange={this._onInputsChange}/>
                            <Input type="file" name='image' label="File" help="[Optional] Block level help text" onChange={this._onInputsChange}/>
                            <Input type="textarea" name='description' label="Description" placeholder="Enter description" onChange={this._onInputsChange}/>
                            <Input type="text" name='price' label="Price" placeholder="Enter price" onChange={this._onInputsChange}/>
                            <Input type="text" name='MinimumAmount' label="MinimumAmount" placeholder="Enter MinimumAmount" onChange={this._onInputsChange}/>
                            <ButtonInput type="submit" value="Submit Button" />
                        </div>
                    </form>
