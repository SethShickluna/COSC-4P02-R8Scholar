from generators import generate_validation_code


def test_code_generator():
    print("Default size: ", generate_validation_code())
    print("Default size: ", generate_validation_code())
    print("Size 4: ", generate_validation_code(4))
    print("Size 7: ", generate_validation_code(7))
    



if __name__ == '__main__':
    test_code_generator()