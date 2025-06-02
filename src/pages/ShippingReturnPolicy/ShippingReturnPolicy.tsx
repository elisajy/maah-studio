import React from 'react';
import { Card, Typography, Divider, Row, Col, Space } from 'antd';
import { ClockCircleOutlined, TruckOutlined, SyncOutlined, MailOutlined, InstagramOutlined } from '@ant-design/icons';
import './ShippingReturnPolicy.scss';

const { Title, Text, Paragraph } = Typography;

const ShippingReturn: React.FC = () => {
  return (
    <div className="shipping-container">
      <div className="shipping-content">
        <Title level={2} className="shipping-title">
          Shipping & Return Policy
        </Title>
        
        <Row gutter={[24, 24]} justify="center">
          {/* Shipping Policy Card */}
          <Col xs={24} lg={12}>
            <Card className="policy-card shipping-card">
              <div className="card-header">
                <TruckOutlined className="card-icon" />
                <Title level={3} className="card-title">Shipping Policy</Title>
              </div>
              
              <Space direction="vertical" size="large" className="policy-content">
                {/* Processing Time */}
                <div className="policy-section">
                  <div className="section-header">
                    <ClockCircleOutlined className="section-icon" />
                    <Text strong className="section-title" style={{'marginBottom': '0px'}}>Processing Time</Text>
                  </div>
                  <Paragraph className="section-text">
                    All orders are processed within <strong>1-3 working days</strong>. 
                    Orders placed on weekends or holidays will be processed the next business day.
                  </Paragraph>
                </div>

                {/* Shipping Rates */}
                <div className="policy-section">
                  <div className="section-header">
                    <TruckOutlined className="section-icon" />
                    <Text strong className="section-title" style={{'marginBottom': '0px'}}>Shipping Rates</Text>
                  </div>
                  <div className="shipping-rates">
                    <div className="rate-item">
                      <Text strong>West Malaysia:</Text>
                      <Text> RM8 flat rate, free shipping for orders above RM250</Text>
                    </div>
                    <div className="rate-item">
                      <Text strong>East Malaysia:</Text>
                      <Text> RM17 flat rate, free shipping for orders above RM400</Text>
                    </div>
                    <div className="rate-item">
                      <Text strong>Singapore:</Text>
                      <Text> First kg RM44, additional 0.5kg RM8</Text>
                    </div>
                  </div>
                  <Text type="secondary" className="note">
                    *Sales items are not applicable for free shipping
                  </Text>
                </div>

                {/* Tracking */}
                <div className="policy-section">
                  <div className="section-header">
                    <MailOutlined className="section-icon" />
                    <Text strong className="section-title" style={{'marginBottom': '0px'}}>Tracking</Text>
                  </div>
                  <Paragraph className="section-text">
                    You will receive a tracking number via email once shipped.
                  </Paragraph>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Return Policy Card */}
          <Col xs={24} lg={12}>
            <Card className="policy-card return-card">
              <div className="card-header">
                <SyncOutlined className="card-icon" />
                <Title level={3} className="card-title">Return Policy</Title>
              </div>
              
              <Space direction="vertical" size="large" className="policy-content">
                <Paragraph className="intro-text">
                  We strive to ensure you're completely satisfied with your purchase. 
                  We only accept returns or exchanges for items that are incorrect or faulty.
                </Paragraph>

                {/* Return Conditions */}
                <div className="policy-section">
                  <Text strong className="section-title">Return Conditions</Text>
                  <ul className="return-conditions" style={{'marginTop': '8px'}}>
                    <li>Returns accepted within <strong>14 days</strong> of delivery date</li>
                    <li>Items must be <strong>unused and unworn</strong></li>
                    <li>Original packaging with all tags attached</li>
                    <li>Only for wrong or defective items</li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="policy-section">
                  <Text strong className="section-title">How to Return</Text>
                  <div className="contact-info" style={{'marginTop': '15px'}}>
                    <div className="contact-item">
                      <MailOutlined className="contact-icon" />
                      <Text>maahstudio@outlook.com</Text>
                    </div>
                    <div className="contact-item">
                      <InstagramOutlined className="contact-icon" />
                      <Text>Instagram chat</Text>
                    </div>
                  </div>
                </div>

                {/* Return Address */}
                <div className="policy-section">
                  <Text strong className="section-title">Return Address</Text>
                  <div className="return-address" style={{'marginTop': '15px'}}>
                    <Text strong>MAAH STUDIO</Text><br />
                    <Text>The Tate</Text><br />
                    <Text>NO 346 RESIDENSI BOTANI 1</Text><br />
                    <Text>PERSIARAN EKO BOTANI 2</Text><br />
                    <Text>TAMAN EKO BOTANI 2</Text><br />
                    <Text>79100 ISKANDAR PUTERI JOHOR</Text><br />
                    <Text>MALAYSIA</Text><br />
                    <Text>Contact: 0167386308</Text>
                  </div>
                </div>

                <Text type="warning" strong className="important-note">
                  *SALE / Discounted items are not returnable nor exchangeable
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShippingReturn;