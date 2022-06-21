import React from 'react';
import axios from "axios";

export class Post extends React.Component {
    constructor( ) {
        console.log( 'Post.constructor()' );

        super();

        this.state = {
            isLoading: false,
            title: '',
            description: '',
        }
    }

    static async fetchData() {
        console.log( 'Post.fetchData()' );

        const response = await axios.get( 'https://jsonplaceholder.typicode.com/posts/3' );

        return {
            title: response.data.title,
            body: response.data.body,
        };
    }

    // when component mounts, fetch data
    componentDidMount() {
        console.log( 'Post.componentDidMount()' );

        this.setState({
            isLoading: true
        })

        Post.fetchData().then(data => {
            this.setState({
                isLoading: false,
                title: data.title,
                description: data.body,
            })
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        console.log( 'Post.render()' );
        const { title, description } = this.state;

        return (
            <div className='ui-post'>
                <p className='ui-post__title'>Post Widget</p>

                {
                    this.state.isLoading ? 'loading...' : (
                        <div className='ui-post__body'>
                            <p className='ui-post__body__title'>{ title }</p>
                            <p className='ui-post__body__description'>{ description }</p>
                        </div>
                    )
                }
            </div>
        );
    }
}