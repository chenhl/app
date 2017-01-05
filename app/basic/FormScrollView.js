/***********************************************
 *
 * MIT License
 *
 * Copyright (c) 2016 珠峰课堂,Ramroll
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, {Component} from 'react'

import {View, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
export class FormScrollView extends Component {

  constructor(){
    super()
    this.state = {
      height : null
    }
  }



  _press(){
    Keyboard.dismiss()
  }


  _layout({nativeEvent : {layout : {x, y, width, height}}}){
    
    if(!this.height)
      this.height = height
  }


  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount(){

    Keyboard.dismiss()
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow (e) {
    const h = e.endCoordinates.height
    this.setState({
      height : this.height - h + 20
    })
  }

  _keyboardDidHide () {
    this.setState({
      height :this.height 
    })
  }

  render(){
    const {height} = this.state
    const style = {}
    if(height) {
      style.height = height
    }
    console.log(style)
    return (
      <View style={style} onLayout={this._layout.bind(this)}>
        <ScrollView keyboardShouldPersistTaps={true} >
          <TouchableWithoutFeedback onPress={this._press}>
            <View>
              {this.props.children}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    )

  }
}