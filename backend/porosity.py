import cv2

def detect_porosity(image_path):
    img = cv2.imread(image_path, 0)
    _, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    pore_area = sum([cv2.contourArea(c) for c in contours])
    total_area = img.shape[0] * img.shape[1]
    porosity = (pore_area / total_area) * 100

    return porosity, len(contours)
