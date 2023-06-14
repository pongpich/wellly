import React from 'react';
import { Modal, View, Text } from 'react-native';

const CentralModalActivity = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>This is a central modal</Text>
          {/* ตัวอย่างเนื้อหาของ Modal */}
          <Text>Modal Content</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

export default CentralModalActivity;
