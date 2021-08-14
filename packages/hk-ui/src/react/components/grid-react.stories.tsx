import React from 'react'
import {storiesOf} from '@storybook/react'

import {Row} from './Row'
import {Col} from './Col'

storiesOf('Core/Components/Grid', module).
    add('React', () => {
        return (
            <div className={'grid-stories'}>
                <Row>
                    <Col sm={6}>
                        hk-col-sm-6
                    </Col>
                    <Col sm={6}>
                       hk-col-sm-6
                    </Col>
                </Row>

                <Row>
                    <Col sm={3} md={6}>
                        hk-col-sm-3 hk-col-md-6
                    </Col>
                    <Col sm={3} md={6}>
                        hk-col-sm-3 hk-col-md-6
                    </Col>
                    <Col sm={3} md={6}>
                        hk-col-sm-3 hk-col-md-6
                    </Col>
                    <Col sm={3} md={6}>
                        hk-col-sm-3 hk-col-md-6
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>hk-col-sm-3</Col>
                    <Col sm={6} className={'hk-col-sm-offset-3'}>hk-col-sm-6 hk-col-sm-offset-3</Col>
                </Row>

                <h2>Auto-layout columns</h2>
                <Row>
                    <Col sm='auto'>hk-col-sm</Col>
                    <Col sm='auto'>hk-col-sm</Col>
                </Row>
                <Row>
                    <Col sm='auto'>hk-col-sm</Col>
                    <Col sm='auto'>hk-col-sm</Col>
                    <Col sm='auto'>hk-col-sm</Col>
                </Row>

                <Row>
                    <Col md={6} sm={12}>
                        <Row>
                            <Col sm='auto' style={{textAlign: 'center'}}>Small screen layout</Col>
                        </Row>
                        <Row>
                            <Col sm={12}>hk-col-sm-12</Col>
                        </Row>
                        <Row>
                            <Col sm={12}>sm-12 md-8</Col>
                        </Row>
                        <Row>
                            <Col sm={12}>sm-12 md-4</Col>
                        </Row>
                        <Row>
                            <Col sm={12}>hk-col-sm-12</Col>
                        </Row>
                    </Col>
                    <Col md={6} sm={12}>
                        <Row>
                            <Col sm='auto' style={{textAlign: 'center'}}>Medium/Large screen layout</Col>
                        </Row>
                        <Row>
                            <Col sm={12}>hk-col-sm-12</Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={8}><div style={{height: '8rem'}}>sm-12 md-8</div></Col>
                            <Col sm={12} md={4}><div style={{height: '8rem'}}>sm-12 md-4</div></Col>
                        </Row>
                        <Row>
                            <Col sm={12}>hk-col-sm-12</Col>
                        </Row>
                    </Col>
                </Row>

                <h2>Predefined layouts</h2>
                <Row sm='6' md='3'>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                    <div>
                        hk-cols-sm-6 hk-cols-md-3
                    </div>
                </Row>

                <h2>Setting one column width</h2>
                <Row>
                    <Col sm='auto'>1 of 3</Col>
                    <Col sm='6'>2 of 3 (wider)</Col>
                    <Col sm='auto'>3 of 3</Col>
                </Row>
                <Row>
                    <Col sm='auto'>1 of 3</Col>
                    <Col sm='5'>2 of 3 (wider)</Col>
                    <Col sm='auto'>3 of 3</Col>
                </Row>
            </div>
        )
    })