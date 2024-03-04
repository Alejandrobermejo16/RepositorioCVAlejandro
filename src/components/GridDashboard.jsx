import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchColumnRandomStart } from '../store/actions/fetchColumnAleatorio';

class GridDashboard extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.dataRandom !== prevProps.dataRandom) {
            console.log('Nuevo valor de dataRandom:', this.props.dataRandom);
        }
    }


    render() {
        const { dataRandom, fetchColumnAleatorioAction } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Estudios</h3>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                        <p>Contenido de la columna 1</p>
                    </Col>
                    <Col>
                        <h3>Tareas realizadas</h3>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>
                        <p>Contenido de la columna 2</p>

                    </Col>
                    <Col>
                        <h3>Experiencia</h3>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>
                        <p>Contenido de la columna 3</p>

                    </Col>
                    <Col>
                        <h3>Cualidades</h3>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>
                        <p>Contenido de la columna 4</p>

                    </Col>
                    <Col>
                        <h3>Palabra aleatoria</h3>
                        <Button variant="dark" onClick={fetchColumnAleatorioAction}>Aleatorio</Button>
                        {dataRandom && <h1>{dataRandom.dataRandom}</h1>}
                        <p>Contenido de la columna 5</p>
                        <p>Contenido de la columna 5</p>
                        <p>Contenido de la columna 5</p>

                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    dataRandom: state.columnRandomReducer.dataRandom,
});

const mapDispatchToProps = (dispatch) => ({
    fetchColumnAleatorioAction: () => dispatch(fetchColumnRandomStart()),

});


export default connect(mapStateToProps, mapDispatchToProps)(GridDashboard);
