import React, { Component } from 'react';

export default function SynthInfoCard(props) {


    var synth = props.data;


    if(synth.length == 0){
        return(
            <div></div>
        )
    }else{
        return(
            <div>
                <div>{synth[0]["make"]}</div>
                <div>{synth[0]["model"]}</div>
                <div>{synth[0]["price"]}</div>
            </div>
        )
        }
    };
