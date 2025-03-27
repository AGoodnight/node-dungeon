from . import colors

class Logger():
    def __init__(self):
        self.colors = colors.LColors

    def warn(self,message):
        print(f"{colors.LColors.WARNING.value}{message}{colors.LColors.ENDC.value}")

    def info(self,message):
        print(f"{colors.LColors.OKBLUE.value}{message}{colors.LColors.ENDC.value}")

    def error(self,message):
        print(f"{colors.LColors.FATAL.value}{message}{colors.LColors.ENDC.value}")

    def success(self,message):
        print(f"{colors.LColors.OKGREEN.value}{message}{colors.LColors.ENDC.value}")
    
