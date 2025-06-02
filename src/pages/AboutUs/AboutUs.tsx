import React from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
import './AboutUs.scss';
import aboutUsImage from '../../images/about-us.jpg';

const { Title, Paragraph, Text } = Typography;

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <Row justify="center">
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          <div className="about-content">
            <div className="about-image">
              <img 
                src={aboutUsImage}
                alt="Maah Studio packaging boxes with Japanese character" 
                className="hero-image"
              />
            </div>
            
            <Title level={2} className="about-title">ABOUT MAAH STUDIO</Title>
            
            <Space direction="vertical" size="large" className="about-text">
              <Paragraph>
                We are inspired by the Japanese concept of "MA" (pronounced "maah"), which celebrates 
                simplicity, balance, and the beauty of space. In a world filled with excess, we believe 
                that less is more—where minimalism allows the true essence of each piece to shine.
              </Paragraph>
              
              <Paragraph>
                Our collections are crafted from premium linen and cotton, chosen for their timeless 
                quality, breathability, and comfort. With a focus on earth tones, our designs evoke a 
                sense of calm and harmony, allowing you to embrace simplicity in style.
              </Paragraph>
              
              <Paragraph>
                We create clothing that not only enhances your wardrobe but also invites you to 
                experience the quiet beauty of a more intentional, mindful way of dressing.
              </Paragraph>
            </Space>
            
            <Divider className="about-divider" />
            
            <div className="company-info">
              <Title level={4} className="info-title">Company Information</Title>
              <Paragraph>
                <Text strong>SSM Registered:</Text> MAAHSTUDIO (SA0623295-A)
              </Paragraph>
              <Paragraph>
                <Text strong>Customer Service:</Text> Maahstudio@outlook.com / Instagram chat
              </Paragraph>
            </div>
            
            <div className="ma-symbol">間</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;